# 📘 Tutorial Professor - Atendimentos


FLUXO DE TRABALHO SUGERIDO:
Aluno envia projeto ZIP por email/WhatsApp

Professor cria branch específica (aluno-nome-sobrenome)

Professor extrai ZIP na pasta do aluno

Professor faz correções e commits

Aluno baixa sua branch corrigida

Aluno estuda as correções

Esta estrutura é simples, organizada e focada na facilidade de uso para iniciantes!


## Como adicionar um novo projeto de aluno

### 1. PREPARAÇÃO INICIAL
```bash
# Clone o repositório (se ainda não tiver)
git clone https://github.com/rjhalmeman/atendimentos.git
cd atendimentos


### 2. CRIAR BRANCH PARA O ALUNO
bash
# Crie uma branch com o nome do aluno
git checkout -b aluno-nome-sobrenome

# Exemplo:
git checkout -b aluno-joao-silva
3. ADICIONAR PROJETO DO ALUNO

```
# Crie pasta para o projeto
mkdir projetos/aluno-joao-silva

# Extraia o ZIP do aluno nesta pasta
# (copie todos os arquivos do ZIP para projetos/aluno-joao-silva/)

```

4. COMMIT E PUSH
bash
# Adicione os arquivos

git add .

# Faça o commit
git commit -m "Adiciona projeto do João Silva - [data]"

# Envie para o GitHub
git push origin aluno-joao-silva


5. FAZER CORREÇÕES
bash
# Faça as correções necessárias nos arquivos
# Depois adicione as mudanças:

git add .
git commit -m "Correções no projeto do João Silva"
git push origin aluno-joao-silva
6. VOLTAR PARA BRANCH PRINCIPAL
bash
git checkout main
DICAS RÁPIDAS
Use nomes consistentes: aluno-nome-sobrenome

Sempre commite após fazer correções

Mantenha o README.md atualizado
