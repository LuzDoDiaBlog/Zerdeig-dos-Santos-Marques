# Publicando seu Blog Gratuitamente na Vercel (Plano Hobby)

Siga este guia passo a passo para colocar seu blog no ar sem custo nenhum.

### 1. Exportar para o GitHub
- No Google AI Studio, clique no ícone de **Configurações (Engrenagem)** no topo.
- Clique em **Export to GitHub**.
- Conecte sua conta e dê um nome ao repositório (ex: `blog-luz-do-dia`).

### 2. Criar conta na Vercel
- Acesse [vercel.com/signup](https://vercel.com/signup).
- Escolha o plano **Hobby** (Grátis).
- Clique em **Continue with GitHub**.

### 3. Importar o Projeto
- No painel da Vercel, clique em **Add New** > **Project**.
- Encontre o repositório `blog-luz-do-dia` e clique em **Import**.

### 4. Configurar a Inteligência Artificial (CRUCIAL)
- Antes de clicar em Deploy, procure a seção **Environment Variables**.
- Adicione a seguinte variável:
  - **NAME**: `VITE_GEMINI_API_KEY` (ou apenas `GEMINI_API_KEY`)
  - **VALUE**: (Cole aqui sua chave da API do Gemini).
- Clique em **Add**.

### 5. Configurações de Build
- A Vercel deve detectar automaticamente que é um projeto **Vite**.
- Se perguntar o comando de build, certifique-se que é: `npm run build`.
- O diretório de saída (Output Directory) deve ser: `dist`.

### 6. Publicar
- Clique em **Deploy**.
- Em instantes seu site estará online!

---
**Dica de Ouro:** Se você tiver qualquer erro, me mande um print ou o texto do erro aqui que eu resolvo para você na hora! Não desista, você está a poucos cliques de realizar seu sonho.
