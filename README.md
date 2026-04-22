# ☀️ Luz do Dia - Liturgia e Orações Diárias

Um blog espiritual moderno e acolhedor focado na fé católica, proporcionando reflexões diárias, liturgia completa e orações inspiradoras geradas por inteligência artificial.

## ✨ Funcionalidades

- **📖 Liturgia Diária**: Conteúdo completo da liturgia católica (Primeira Leitura, Salmo, Evangelho e Santo do dia) atualizado automaticamente.
- **🙏 Orações Temáticas**: Geração de orações e reflexões personalizadas baseadas em temas como Paz, Esperança, Gratidão, etc.
- **🤖 Inteligência Artificial**: Integrado ao Google Gemini 1.5 Flash para gerar reflexões profundas e orações poéticas.
- **📱 Mobile First**: Design otimizado para celulares (PWA), permitindo instalar o blog como um aplicativo.
- **🔗 Compartilhamento**: Integração direta com WhatsApp, Facebook e outras redes sociais com formatação especial.
- **🎨 Design Zen**: Interface limpa, suave e com animações leves para proporcionar uma experiência de paz.

## 🛠️ Tecnologias Utilizadas

- **Frontend**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Estilização**: [Tailwind CSS](https://tailwindcss.com/)
- **Animações**: [Motion](https://motion.dev/)
- **Ícones**: [Lucide React](https://lucide.dev/)
- **IA**: [Google Gemini API](https://ai.google.dev/)

## 🚀 Como Executar Localmente

1. Clone o repositório do seu GitHub.
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz e adicione sua chave de API:
   ```env
   VITE_GEMINI_API_KEY=sua_chave_aqui
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🌐 Publicação (Deployment)

Este projeto foi configurado para ser publicado facilmente na **Vercel**:

1. Importe o repositório do GitHub na Vercel.
2. Nas configurações do projeto, adicione a Variável de Ambiente:
   - **Name**: `VITE_GEMINI_API_KEY`
   - **Value**: Sua chave de API do Google AI Studio.
3. O projeto será compilado e publicado automaticamente.

## 👩‍💻 Administradora

O blog possui uma área administrativa acessível para a gestora do conteúdo, permitindo visualizar o calendário litúrgico e gerenciar as reflexões diárias (salvas localmente no dispositivo para segurança e rapidez).

---
*Feito com ❤️ por [Sua Nome/Luz do Dia]*
