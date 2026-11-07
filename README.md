# Barbearia Invictus — Guia Rápido de Edição e Manutenção

Este projeto foi construído para modernizar a presença digital da **Barbearia Invictus** em Jundiaí - SP, com foco em alta performance, carregamento instantâneo no celular e conversão direta via WhatsApp.

---

## Onde editar os textos e preços do site

Todos os dados do negócio estão isolados em um único arquivo:
👉 `src/data/barbeariaData.ts`

Você pode editar com facilidade:

1. **Preços e Serviços**:
   - `SERVICES`: Nome do corte/barba, valor em R$ (ex: `R$ 35,00`), descrição e mensagem do WhatsApp enviada ao clicar.

2. **Horários de Funcionamento**:
   - `OPENING_HOURS`: Dias da semana e horários de abertura e fechamento.

3. **Endereço e Contatos**:
   - `BARBEARIA_CONFIG.phoneFormatted`: Telefone visível (ex: `(11) 94268-8432`)
   - `BARBEARIA_CONFIG.phoneRaw`: Número para links do WhatsApp (ex: `5511942688432`)
   - `BARBEARIA_CONFIG.email`: E-mail de contato
   - `BARBEARIA_CONFIG.address`: Rua, bairro, CEP e cidade

4. **Depoimentos**:
   - `REVIEWS`: Avaliações reais de clientes com estrelas e texto.

5. **Fotos da Galeria**:
   - `GALLERY_PHOTOS`: Adicione ou substitua imagens da galeria. As fotos ficam armazenadas na pasta `/public/assets/aistudio/`.

---

## Integrações Google Preparadas

- **Google Analytics 4**: Defina a variável `VITE_GA_TRACKING_ID="G-XXXXXXXXXX"` no arquivo `.env`.
- **Google Search Console**: Meta tag preparada em `index.html`.
- **Schema.org BarberShop**: Já configurado em `index.html` com endereço e dados comerciais em Jundiaí para indexação local pelo Google.

---

## Executar o Projeto Localmente

```bash
npm install
npm run dev
```

O site estará disponível em `http://localhost:3000`.
