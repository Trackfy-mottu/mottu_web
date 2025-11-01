# 🏍️ Mottu Mobile - Sistema de Gerenciamento de Motos

## Link da Apresentação
-  https://youtu.be/FUq_KvbYogI

## 📋 Descrição do Projeto

O **Mottu Mobile** é um aplicativo desenvolvido em React Native para gerenciamento inteligente de frotas de motocicletas em pátios corporativos. O sistema permite controle completo sobre o status das motos, localização, pendências de manutenção e organização por setores do pátio.

---

## 🚀 Proposta e Funcionalidades

### 📱 Funcionalidades Principais

- **🔐 Sistema de Autenticação**
  - Login e cadastro de usuários
  - Controle de permissões por função (Admin/Funcionário)
  - Vinculação de usuários a pátios específicos

- **🏍️ Gerenciamento de Motos**
  - Cadastro completo de motocicletas (modelo, placa, chassi, status)
  - Visualização de todas as motos do pátio
  - Edição e exclusão de registros
  - Controle de localização (dentro/fora do pátio)
  - Status operacional (Pronta para uso, Em manutenção, Para descarte)

- **📋 Sistema de Pendências**
  - Criação de pendências para cada moto
  - Acompanhamento de status das pendências
  - Gestão completa do ciclo de vida das tarefas
  - Histórico detalhado de manutenções

- **🏢 Visualização de Setores**
  - Mapeamento visual do pátio por áreas
  - Status em tempo real de cada setor
  - Localização estratégica das motocicletas
  - Sistema de cores para identificação rápida

- **🎨 Interface Responsiva**
  - Tema claro e escuro
  - Design intuitivo e moderno
  - Navegação drawer para facilidade de uso
  - Compatibilidade com diferentes dispositivos

---

## 📁 Estrutura de Pastas

```
mobile_mottu/
├── 📁 src/
│   ├── 📁 assets/              # Imagens e recursos visuais
│   │   ├── 🖼️ Emoto.png
│   │   ├── 🖼️ logoMottu.png
│   │   ├── 🖼️ motoMottu.jpg
│   │   └── 👤 perfis dos desenvolvedores
│   │
│   ├── 📁 components/          # Componentes reutilizáveis
│   │   ├── ⚛️ AddPendingModal.tsx
│   │   ├── 🏍️ BikeCard.tsx
│   │   ├── 🎴 Card.tsx
│   │   ├── 🖼️ ImageButton.tsx
│   │   ├── 🔑 LoginForm.tsx
│   │   ├── 📋 PendingDetailsModal.tsx
│   │   └── 📝 SignUpForm.tsx
│   │
│   ├── 📁 routes/              # Configuração de navegação
│   │   ├── 🗂️ DrawerRoutes.tsx
│   │   ├── 📚 StackRoutes.tsx
│   │   └── 🌐 index.tsx
│   │
│   ├── 📁 screens/             # Telas principais
│   │   ├── 👥 AboutUs.tsx
│   │   ├── 🏍️ Bikes.tsx
│   │   ├── 📝 BikesForm.tsx
│   │   ├── 🏠 Home.tsx
│   │   ├── 🔑 Login.tsx
│   │   ├── 🚪 Logout.tsx
│   │   └── 🏢 Patio.tsx
│   │
│   └── 📁 services/            # Serviços e contextos
│       └── 🎨 ThemeContext.tsx
│
├── 📄 App.tsx                  # Componente principal
├── 📋 package.json             # Dependências do projeto
├── ⚙️ app.json                 # Configurações do Expo
├── 📝 README.md                # Documentação
└── 🔧 tsconfig.json           # Configurações TypeScript
```

---

## 👨‍💻 Integrantes da Equipe

### 🎓 Turma: 2TDSPZ

| Nome | RM | GitHub | LinkedIn | Instagram |
|------|----|---------|-----------| ---------|
| **João Vitor Silva Nascimento** | RM554694 | [🔗 @joaosilvaz](https://github.com/joaosilvaz) | [🔗 LinkedIn](https://www.linkedin.com/in/jo%C3%A3o-vitor-da-silva-5677202b1/) | [📸 @joaovitoor._](https://www.instagram.com/joaovitoor._/) |
| **Guilherme Alves Pedroso** | RM555357 | [🔗 @guialvesped](https://github.com/guialvesped) | [🔗 LinkedIn](https://www.linkedin.com/in/guialvesped/) | [📸 @g__alves_](https://www.instagram.com/g__alves_/) |
| **Rafael Souza Bezerra** | RM557888 | [🔗 @Rafazls](https://github.com/Rafazls) | [🔗 LinkedIn](https://www.linkedin.com/in/rafa-bezerra/) | [📸 @raffsz.__](https://www.instagram.com/raffsz.__/) |

---

## 🛠️ Tecnologias Utilizadas

- **📱 React Native** - Framework para desenvolvimento móvel
- **⚛️ Expo** - Plataforma de desenvolvimento
- **🗺️ React Navigation** - Sistema de navegação
- **🎨 React Native Paper** - Componentes de UI
- **📡 Axios** - Cliente HTTP para API
- **💾 AsyncStorage** - Armazenamento local
- **🎭 Vector Icons** - Ícones vetorizados
- **📝 TypeScript** - Tipagem estática

---

## ⚙️ Instalação e Execução

### 📋 Pré-requisitos
- Node.js (versão 14 ou superior)
- npm ou yarn
- Expo CLI
- Expo Go (para teste em dispositivo móvel)

### 🔧 Passo a passo

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/mobile_mottu.git
cd mobile_mottu
```

2. **Instale as dependências**
```bash
npm install
# ou
yarn install
```

3. **Inicie o projeto**
```bash
npm start
# ou
expo start
```

4. **Teste no dispositivo**
   - Instale o **Expo Go** no seu smartphone
   - Escaneie o QR Code gerado no terminal
   - O app será carregado automaticamente

---

## 🖥️ Backend Integration

O aplicativo se integra com um sistema backend dividido em duas camadas:

- **☕ Java (Spring Boot)**: Processamento de dados dos sensores
- **🔷 C# (.NET 8)**: Autenticação e regras de negócio

### 📡 Endpoints Principais
- `POST /api/login` - Autenticação
- `GET/POST/PUT/DELETE /api/bike` - Gestão de motos
- `GET/POST/PUT/DELETE /api/pendings` - Gestão de pendências
- `GET /api/court/all` - Listagem de pátios

---

## 📱 Funcionalidades Detalhadas

### 🔐 **Autenticação**
- Sistema robusto de login/cadastro
- Controle de sessão com AsyncStorage
- Diferentes níveis de acesso (Admin/Funcionário)

### 🏍️ **Gestão de Motos**
- Cadastro com validação completa
- Modelos suportados: Sport, Pop, E-Moto
- Controle de status operacional
- Localização em tempo real

### 📋 **Sistema de Pendências**
- Criação dinâmica de tarefas
- Status: Pendente, Em Andamento, Resolvido
- Interface intuitiva para gestão
- Histórico completo de ações

### 🎨 **Interface**
- Design responsivo e moderno
- Tema claro/escuro alternável
- Navegação fluida com drawer
- Feedback visual consistente

---

## 📹 Demonstração

**Vídeo completo da aplicação em funcionamento:**
[🎥 https://youtu.be/Yhw00OrE6qs](https://youtu.be/Yhw00OrE6qs)

*O vídeo apresenta todas as funcionalidades do aplicativo, desde o login até a gestão completa de motos e pendências.*

---

## 🚀 Arquitetura do Projeto

### 🔄 **Fluxo de Navegação**
```
Login → Drawer Navigator → Stack Navigator
  ├── Home (Dashboard principal)
  ├── Motos (Lista e gestão)
  ├── Cadastro (Formulários)
  ├── Pátio (Visualização setores)
  ├── Sobre Nós (Equipe)
  └── Logout (Encerramento)
```

### 🎨 **Gerenciamento de Estado**
- Context API para temas globais
- AsyncStorage para persistência
- Estados locais com useState/useEffect

### 📡 **Integração API**
- Axios configurado com interceptors
- Headers de autenticação automáticos
- Tratamento robusto de erros

---

## 📄 Licença

Este projeto foi desenvolvido como trabalho acadêmico para a FIAP - Faculdade de Informática e Administração Paulista.

---

**Desenvolvido com 💚 pela equipe Trackfy**
