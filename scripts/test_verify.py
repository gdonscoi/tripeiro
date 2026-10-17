"""Regressões dos checks de publicação, com cópias temporárias descartáveis."""

from pathlib import Path
import shutil
import re
import tempfile
import unittest
from zipfile import ZipFile, ZipInfo

from verify import verify


class PublicationChecks(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory(prefix="tripeiro-check-test-")
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name).resolve()
        if self.root.parent != Path(tempfile.gettempdir()).resolve():
            raise ValueError("Diretório de teste fora do local esperado")
        source = Path(__file__).resolve().parents[1]
        for name in ("skills", "scripts", "docs", "translations"):
            shutil.copytree(source / name, self.root / name, ignore=shutil.ignore_patterns("__pycache__"))
        metadata = (self.root / "skills/tripeiro/SKILL.md").read_text(encoding="utf-8-sig")
        version = re.search(r'^\s*version:\s*"([^"]+)"', metadata, re.MULTILINE)[1]
        self.zip = self.root / f"docs/downloads/tripeiro-skill-{version}.zip"

    def rewrite_zip(self, change):
        with ZipFile(self.zip) as archive:
            entries = [(entry.filename, archive.read(entry)) for entry in archive.infolist()]
        with ZipFile(self.zip, "w") as archive:
            for name, data in change(entries):
                # Todos os timestamps diferem dos arquivos regenerados.
                archive.writestr(ZipInfo(name, (2001, 1, 1, 0, 0, 0)), data)

    def test_current_publication_ignores_zip_metadata_and_line_endings(self):
        self.rewrite_zip(lambda entries: [(name, data.replace(b"\r\n", b"\n")) for name, data in entries])
        verify(self.root)

    def test_stale_instructions_fail(self):
        with (self.root / "docs/instrucoes.txt").open("a", encoding="utf-8") as file:
            file.write("\nConteúdo divergente\n")
        with self.assertRaisesRegex(ValueError, "instrucoes.txt desatualizado"):
            verify(self.root)

    def test_stale_english_instructions_fail(self):
        with (self.root / "docs/en/instrucoes.txt").open("a", encoding="utf-8") as file:
            file.write("\nStale content\n")
        with self.assertRaisesRegex(ValueError, "en/instrucoes.txt desatualizado"):
            verify(self.root)

    def test_stale_english_reference_fails(self):
        with (self.root / "docs/en/formato-do-roteiro.md").open("a", encoding="utf-8") as file:
            file.write("\nStale reference\n")
        with self.assertRaisesRegex(ValueError, "en/formato-do-roteiro.md desatualizado"):
            verify(self.root)

    def test_valid_but_stale_example_fails(self):
        path = self.root / "docs/exemplo-roteiro.json"
        path.write_text(path.read_text(encoding="utf-8").replace("Gramado", "Canela"), encoding="utf-8")
        with self.assertRaisesRegex(ValueError, "exemplo-roteiro.json desatualizado"):
            verify(self.root)

    def test_invalid_source_json_fails(self):
        (self.root / "skills/tripeiro/assets/exemplo-roteiro.json").write_text("{", encoding="utf-8")
        with self.assertRaises(ValueError):
            verify(self.root)

    def test_wrong_format_fails(self):
        path = self.root / "skills/tripeiro/assets/exemplo-roteiro.json"
        path.write_text(path.read_text(encoding="utf-8").replace('"version": 1', '"version": 2'), encoding="utf-8")
        with self.assertRaisesRegex(ValueError, "formato/versão"):
            verify(self.root)

    def test_missing_zip_entry_fails(self):
        self.rewrite_zip(lambda entries: entries[1:])
        with self.assertRaisesRegex(ValueError, "zip desatualizado"):
            verify(self.root)

    def test_changed_zip_entry_fails(self):
        self.rewrite_zip(lambda entries: [(name, data + b"\nchanged") for name, data in entries])
        with self.assertRaisesRegex(ValueError, "zip desatualizado"):
            verify(self.root)

    def test_duplicate_zip_entry_fails(self):
        self.rewrite_zip(lambda entries: entries + entries[:1])
        with self.assertRaisesRegex(ValueError, "entrada repetida"):
            verify(self.root)


if __name__ == "__main__":
    unittest.main()
