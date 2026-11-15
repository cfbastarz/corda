# Corda

Editor de tablaturas para instrumentos de corda, instalável como PWA e utilizável offline.

**Abrir:** https://cfbastarz.github.io/corda/

## Instalar

Abra o endereço uma vez com internet e aguarde o preparo do cache.

- **Chrome/Edge:** clique em Instalar app ou no ícone de instalação da barra de endereço.
- **Safari no Mac:** Arquivo → Adicionar ao Dock.
- **iPhone/iPad:** Safari → Compartilhar → Adicionar à Tela de Início.

Os controles de instalação variam conforme o navegador. A instalação não sincroniza músicas entre aparelhos.

## Escrever tablaturas

Clique numa corda para fixar a posição. Digite uma casa de 0 a 24; dois dígitos rápidos formam uma casa. Espaço avança, setas navegam, Shift + setas seleciona e Delete apaga. As ferramentas inferiores inserem casas, técnicas e comandos de edição.

- Dois instrumentos de 1 a 12 cordas, com nomes livres, afinações independentes e colunas alinhadas.
- Textos acima das cordas, ancorados às colunas, para Início, Verso, Refrão, Ponte e outras indicações.
- Sugestões de nomes divertidos para músicas e ideias.
- Slides, ligados, bends, vibrato, ghost notes, harmônicos e tapping.
- Palhetadas abaixo da pauta e P.M. com linha tracejada sobre o trecho selecionado.
- Modo claro/noturno, quatro paletas e zoom de 60% a 180%.
- Reprodução sintética em colcheias regulares, seleção e loop. Técnicas e repetições são indicações visuais e não alteram o áudio.
- Exportação e importação JSON, exportação TXT e impressão/PDF.

## Seus dados

As músicas e preferências ficam no armazenamento local do navegador. O app não envia músicas para o GitHub e não usa servidor de banco de dados, rastreadores ou serviços de terceiros. Limpar os dados do navegador pode apagar os projetos. Exporte JSON regularmente.

Para migrar da versão local, exporte cada projeto em JSON e importe no endereço publicado. Localhost, arquivos locais e GitHub Pages têm armazenamentos separados. Projetos JSON das versões 1, 2, 3 e 4 são compatíveis.

## Atualizações

O service worker mantém uma cópia consistente dos arquivos do app. Ao detectar uma atualização, mostra um aviso; clique em Atualizar agora quando quiser aplicá-la. Antes de recarregar, o app salva o projeto aberto. O cache do app é separado do armazenamento das músicas.

## Desenvolvimento local

Sem dependências ou compilação:

```bash
python3 -m http.server 8080
```

Abra http://localhost:8080/. Service workers precisam de HTTPS ou localhost; abrir o HTML diretamente não ativa a PWA.

## Publicar no GitHub Pages

Em Settings → Pages, publique a branch `main`, pasta raiz (`/`). O arquivo `.nojekyll` permite servir os arquivos estáticos diretamente. Todos os caminhos são relativos para funcionar no subdiretório `/corda/`.

A cada atualização, altere `VERSION` em `sw.js`. Inclua novos arquivos essenciais na lista `FILES`. Não inclua backups de músicas no repositório.

Para testar o fluxo offline: abra o app com o servidor ativo, aguarde o cache, encerre o servidor e recarregue. O editor deve continuar abrindo. Teste também o salvamento e a reabertura de um projeto.

## Textos e nomes de ideias

Clique na faixa Aa acima da tablatura na coluna desejada, digite o texto e salve. F2 abre o texto da coluna selecionada. Cada instrumento tem seus próprios textos. Eles acompanham a inserção e remoção de colunas, são incluídos no JSON e no TXT e aparecem na impressão. Copiar/recortar uma seleção com todas as cordas também inclui os textos.

Abaixo do título, Sugerir um nome divertido oferece três opções e permite pedir outras. Escolher um nome pode ser desfeito como qualquer edição. A escolha não altera as notas.

## Instrumentos e afinações — v1.4.0

Em Instrumento e tempo, use Nome do instrumento para escrever livremente Violão, Baixo ou outro nome. Escolha de 1 a 12 cordas. As afinações prontas incluem guitarra/violão, Drop D/C, Ré padrão, meio tom abaixo, DADGAD, Open G/D, guitarras de 7/8 cordas, violão de 7 cordas, baixos de 4/5/6 cordas, ukulele, banjo e bandolim de 8 cordas em pares.

Os campos de cada corda aceitam nota e oitava, por exemplo E2, C#3 ou Bb1. A corda 1 corresponde à primeira linha da tablatura. Para instrumentos com afinação reentrante, como ukulele e banjo, as alturas não precisam estar ordenadas.

Alterar a afinação preserva as casas, alterando a altura da reprodução. Ao reduzir a quantidade de cordas, as notas excedentes ficam ocultas e salvas no projeto. Aumentar o número de cordas recupera essas notas; escolher outra afinação altera o som, sem converter a digitação entre instrumentos.

Os backups novos usam a versão 4. A versão do app é mostrada no rodapé da biblioteca e do editor.
