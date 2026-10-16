"""Confere a publicação sem modificar docs/; somente biblioteca padrão Python."""

import json
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
from zipfile import ZipFile


def unique_object(pairs):
    result = {}
    for key, value in pairs:
        if key in result:
            raise ValueError(f"Campo JSON repetido: {key}")
        result[key] = value
    return result


def invalid_constant(value):
    raise ValueError(f"Número não permitido em JSON: {value}")


def check_example(path):
    text = path.read_text(encoding="utf-8-sig")
    value = json.loads(text, object_pairs_hook=unique_object,
                       parse_constant=invalid_constant)
    if not isinstance(value, dict):
        raise ValueError(f"{path.name}: esperado objeto JSON")
    if value.get("format") != "tripeiro-plan" or type(value.get("version")) is not int or value["version"] != 1:
        raise ValueError(f"{path.name}: formato/versão incompatível")
    trip = value.get("trip")
    if not isinstance(trip, dict) or any(
        not isinstance(trip.get(key), str) or not trip[key].strip()
        for key in ("name", "destination")
    ):
        raise ValueError(f"{path.name}: viagem sem nome ou destino")
    for key in ("transports", "stays", "itinerary", "contacts"):
        if key in value and not isinstance(value[key], list):
            raise ValueError(f"{path.name}: {key} deve ser uma lista")


def content(data, name):
    # Checkout no Windows pode converter LF em CRLF. Espaços e demais bytes
    # continuam significativos; binários não são normalizados.
    if Path(name).suffix.lower() in {".md", ".json", ".txt"}:
        return data.decode("utf-8-sig").replace("\r\n", "\n")
    return data


def archive_content(path):
    with ZipFile(path) as archive:
        files = {}
        for entry in archive.infolist():
            name = entry.filename
            if name in files:
                raise ValueError(f"{path.name}: entrada repetida: {name}")
            if not name.startswith("tripeiro/") or "\\" in name or ".." in name.split("/") or entry.is_dir():
                raise ValueError(f"{path.name}: caminho inesperado: {name}")
            files[name] = content(archive.read(entry), name)
        return files


def verify(root):
    root = Path(root).resolve()
    skill = root / "skills/tripeiro"
    metadata = (skill / "SKILL.md").read_text(encoding="utf-8-sig")
    match = re.search(r'^\s*version:\s*"(\d+\.\d+\.\d+)"\s*$', metadata, re.MULTILINE)
    if not match:
        raise ValueError("SKILL.md sem versão semântica em metadata.version")
    version = match[1]
    for path in (skill / "assets/exemplo-roteiro.json", root / "docs/exemplo-roteiro.json"):
        check_example(path)
    shell = shutil.which("pwsh") or shutil.which("powershell")
    if not shell:
        raise ValueError("PowerShell não encontrado para executar scripts/build.ps1")
    # Diretório exclusivo criado pelo próprio processo, removido ao sair.
    with tempfile.TemporaryDirectory(prefix="tripeiro-verify-") as temporary:
        output = Path(temporary).resolve()
        if output.parent != Path(tempfile.gettempdir()).resolve():
            raise ValueError("Diretório temporário fora do local esperado")
        subprocess.run([shell, "-NoProfile", "-File", str(root / "scripts/build.ps1"),
                        "-OutputDirectory", str(output)], check=True)
        for name in ("instrucoes.txt", "exemplo-roteiro.json"):
            if content((root / "docs" / name).read_bytes(), name) != content((output / name).read_bytes(), name):
                raise ValueError(f"docs/{name} desatualizado; execute scripts/build.ps1")
        name = f"tripeiro-skill-{version}.zip"
        published = archive_content(root / "docs/downloads" / name)
        generated = archive_content(output / "downloads" / name)
        if published != generated:
            changed = sorted(key for key in published.keys() | generated.keys()
                             if key not in published or key not in generated or published[key] != generated[key])
            raise ValueError(f"{name} desatualizado: {', '.join(changed)}; execute scripts/build.ps1")
    print(f"Publicação da skill {version} consistente.")


if __name__ == "__main__":
    verify(Path(__file__).resolve().parents[1])
