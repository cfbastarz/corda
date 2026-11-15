# Corda 2.0

Caderno pessoal de tablaturas, PWA estática para uso no navegador e offline.

**App:** https://cfbastarz.github.io/corda/

## Compor

- Até dois instrumentos, com nomes livres, 1 a 12 cordas e afinação por corda.
- Clique para fixar a posição; números escrevem casas (0–24), setas navegam, Espaço avança.
- Ctrl+clique, ⌘+clique ou clique direito numa corda abre os acordes. Escolha fundamental, qualidade e posição e clique em **Inserir**. As seis/mais cordas são preenchidas na coluna escolhida; × indica corda abafada. A anotação com o nome do acorde é adicionada acima.
- **Acordes e braço** abre o dicionário com 12 fundamentais e 12 qualidades, posições calculadas para a afinação atual e consulta às notas/intervalos nas casas 0–24. Também funciona na tela inicial.
- **Transpor** altera o instrumento, as colunas selecionadas ou todos os instrumentos, mantendo a afinação. Procura casas 0–24; se uma nota/acorde não couber, nenhuma alteração é aplicada. Notas em cordas ocultas devem ser reexibidas antes de transpor. Nomes de acordes/anotações são textos e precisam de revisão manual após transposição.
- Desfazer/refazer recupera alterações musicais, incluindo estrutura, acordes, transposição e remoção de instrumento.

## Compassos e acompanhamento

Em **Instrumento e tempo → Compassos e sincronização**, ajuste quantidade de compassos, BPM, fórmula, subdivisão e compassos por sistema. Por exemplo, 100 compassos em 4/4 a 130 BPM duram aproximadamente 3min04s. BPM é sempre em semínimas, inclusive em 6/8.

Cada posição da grade tem duração definida pela subdivisão. O acompanhamento percorre todos os compassos, inclusive silêncios. A grade mostra números de compassos e separadores automáticos. Alterar fórmula/subdivisão preserva posições pelo tempo dentro de cada compasso; colisões são recusadas e cortes pedem confirmação.

**Acompanhar** inicia/pausa o relógio e a rolagem; **Início** volta ao começo; **Da seleção** parte da coluna selecionada. A barra de posição permite buscar trechos. **Seguir tablatura** pode ser desativado e a velocidade vai de 50% a 200%. A velocidade também altera o MP3, preservando sua altura quando suportado pelo navegador. A reprodução **Ouvir** continua disponível como referência sintética e segue a subdivisão configurada.

## MP3 local

**+ MP3 de referência** carrega áudio do computador (até 200 MB). O arquivo é guardado no IndexedDB do navegador, quando há espaço. Nada é enviado a um servidor. Em **Início da tablatura no áudio**, indique o segundo do MP3 que corresponde ao primeiro compasso (por exemplo, 5,2 para pular uma introdução). Valores negativos adicionam uma espera antes de iniciar o áudio.

O relógio do áudio guia o cursor, evitando acumular desvio por temporizadores. A sincronização depende de BPM, fórmula, subdivisão e início corretos; gravações com andamento variável exigem um mapa de tempo importado ou ajustes. JSON guarda a estrutura e o deslocamento, mas **não** inclui o MP3; transfira-o separadamente. Remover o áudio o exclui do armazenamento local deste projeto.

## Exportar

- **Projeto editável JSON:** formato v5; lê arquivos v1–v5 e migra os antigos. Dados continuam locais. Exporte backups antes de limpar o navegador.
- **Texto:** tablatura com instrumentos e anotações.
- **PDF:** arquivo A4 de alta resolução (200 dpi), fundo branco, título, informações, compassos numerados, nomes/afinações dos instrumentos, margens e páginas. Usa imagens de alta resolução, portanto texto não é selecionável.
- **Tira para vídeo:** escolha intervalo de compassos, instrumento(s), fundo branco/transparente e PNG ou SVG. Tamanhos 1920×540, 3840×1080, 1920×1080 e 3840×2160. A tira é contínua; use trechos curtos para legibilidade. Exportações excessivamente densas são recusadas.

## Importar Guitar Pro

Na tela inicial, use **Importar Guitar Pro** e selecione .gp3, .gp4, .gp5, .gpx ou .gp (GP7/GP8). Escolha até duas faixas com cordas. A leitura é local, com alphaTab 1.9.0, incluído no app para funcionamento offline. Nenhum arquivo é enviado ao servidor.

Importa afinações, casas, ataques, compassos, andamento por compasso, textos/acordes e técnicas compatíveis. Seleciona automaticamente uma grade para representar os ataques, inclusive tercinas comuns. O relatório avisa aproximações, notas fora do alcance/compasso e colisões de vozes. Recursos que o Corda não representa integralmente: durações sustentadas e suas ligaduras, dinâmica, articulações avançadas, execução de repetições/casas e alterações de tempo no interior do compasso. Repetições ficam na ordem escrita, sem expandir voltas. Revise a importação antes de sincronizar com uma gravação.

Limites: 2.000 compassos e 32.768 posições de tempo por projeto; 8–128 posições por sistema. Grades muito grandes podem ser pesadas em dispositivos móveis.

## PWA e desenvolvimento

A instalação não exige conta. Abra com internet uma vez para preparar os arquivos offline. O banner **Atualizar agora** aplica novas versões mantendo projetos. O contador Hits aparece apenas na tela inicial da versão hospedada.

Para rodar localmente: `python3 -m http.server 8080` nesta pasta. Abra `http://localhost:8080/?dev=1` para testar alterações sem registrar service worker. Remova `?dev=1` para testar a PWA offline.

Arquivos principais: `index.html`, `style.css`, `app.js` (edição), `music.js` (modelo musical), `studio.js` (prática/importação/exportação), `pwa.js`, `sw.js`. Incremente APP_VERSION e VERSION em cada publicação.

Terceiros: [alphaTab](https://github.com/CoderLine/alphaTab), versão 1.9.0, MPL-2.0; licença em `alphatab-LICENSE.txt`. O arquivo distribuído não foi modificado. [Hits](https://hits.sh/) fornece o contador externo opcional da tela inicial.

Validação do modelo: `node test-music.cjs` e `node test-import.mjs`.
