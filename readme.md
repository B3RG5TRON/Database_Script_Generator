# Database Script Generator

Este projeto tem como objetivo gerar scripts SQL para inserir registros em uma tabela do banco de dados já existente e garantindo que não haja duplicidade de dados. O script que é gerado no 'generateScript' é apenas um exemplo, onde a tabela referida é utilizada como regra de expansão automática e permite customização dos IDs de empresas e tipos de itens.

## Como funciona

O script percorre todas as combinações possíveis entre empresas de expansão e empresas de origem, para cada tipo de item informado, e gera comandos SQL que só inserem registros se eles ainda não existirem na tabela.

## Como usar

1. **Configure os IDs**
   - No arquivo [`generateScript.js`](generateScript.js), edite os arrays:
     - `id_empresas_br`: IDs das empresas brasileiras.
     - `id_empresas_es`: IDs das empresas espanholas.
     - `id_tipo_items`: IDs dos tipos de itens desejados.
     - Ajuste a variável `prioridade` se necessário.

2. **Execute o gerador de script**
   - No terminal, execute:
     ```sh
     node generateScript.js
     ```

3. **Arquivos gerados**
   - Os arquivos SQL serão criados automaticamente na pasta `temp`:
     - `inserts_empresas_expansao_automatica_BR.sql`
     - `inserts_empresas_expansao_automatica_ES.sql`

4. **Execução dos scripts**
   - Os scripts gerados contêm comandos `IF NOT EXISTS` para evitar duplicidade.
   - O comando `--COMMIT;` está comentado por padrão. Revise e descomente conforme sua política de deploy.
   - Os scripts podem ser executados diretamente no banco de dados desejado.

## Observações

- O script só insere registros que ainda não existem na tabela.
- O processo é totalmente automatizado: basta rodar o comando e os arquivos serão gerados prontos para uso.
- Mensagens de status são impressas no console durante a execução.
- Para dúvidas ou sugestões, abra uma issue ou entre em contato.

---

**Resumo das instruções rápidas:**
- Edite os arrays de IDs e tipos de itens no início do arquivo.
- Rode `node generateScript.js` no terminal.
- Os arquivos `.sql` estarão na pasta `temp` que é gerada automaticamente ao rodar o comando acima no terminal.
- Execute os scripts no banco desejado.

🚀📝💾