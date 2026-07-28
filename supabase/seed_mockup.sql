-- Dados de exemplo (mockup) para visualizar o catálogo com peças "reais".
-- Execute no SQL Editor do Supabase. As FOTOS são placeholders coloridos
-- (não são fotos de verdade), só para você ver o layout funcionando.
-- Quando cadastrar suas peças de verdade pelo painel admin, apague estas
-- (Admin > Produtos > Excluir) ou rode este script de novo — ele substitui
-- os mockups anteriores pelo nome, sem duplicar.

delete from public.produtos where nome in (
  'Anel Solitário Ouro 18k',
  'Colar Gravata Rosé',
  'Brincos Argola Clássica',
  'Pulseira Riviera Cristais',
  'Anel Trançado Duo',
  'Colar Ponto de Luz',
  'Brincos Pérola Clássica',
  'Pulseira Elos Cartier',
  'Anel Vintage Esmeralda',
  'Colar Choker Minimalista'
);

insert into public.produtos (nome, descricao, categoria, material, preco, fotos, estoque, status, destaque)
values
  ('Anel Solitário Ouro 18k',
    'Um clássico atemporal. Anel solitário em ouro amarelo 18k, com lapidação que realça o brilho da pedra central.',
    'aneis', 'Ouro amarelo 18k', 2890.00,
    array['https://placehold.co/900x1100/EDE6DA/B28A4F.png?text=Anel+Solit%C3%A1rio', 'https://placehold.co/900x1100/F5EFE4/B28A4F.png?text=Detalhe'],
    1, 'disponivel', true),

  ('Colar Gravata Rosé',
    'Colar em ouro rosé com design fluido inspirado em gravatas vintage. Peça statement para ocasiões especiais.',
    'colares', 'Ouro rosé 18k', 1450.00,
    array['https://placehold.co/900x1100/D9B8AE/FFFFFF.png?text=Colar+Gravata', 'https://placehold.co/900x1100/EDE6DA/B28A4F.png?text=Detalhe'],
    2, 'disponivel', true),

  ('Brincos Argola Clássica',
    'Argolas médias em prata 925, versáteis para o dia a dia e para looks noturnos.',
    'brincos', 'Prata 925', 320.00,
    array['https://placehold.co/900x1100/F5EFE4/2A2420.png?text=Brincos+Argola'],
    5, 'disponivel', false),

  ('Pulseira Riviera Cristais',
    'Pulseira riviera cravejada, banhada a ouro, com cristais que capturam a luz a cada movimento.',
    'pulseiras', 'Prata banhada a ouro', 890.00,
    array['https://placehold.co/900x1100/EDE6DA/B28A4F.png?text=Pulseira+Riviera', 'https://placehold.co/900x1100/D9B8AE/FFFFFF.png?text=Detalhe'],
    3, 'disponivel', true),

  ('Anel Trançado Duo',
    'Duas faixas entrelaçadas em ouro branco, simbolizando união. Design moderno e minimalista.',
    'aneis', 'Ouro branco 18k', 3200.00,
    array['https://placehold.co/900x1100/E7DED0/2A2420.png?text=Anel+Tran%C3%A7ado'],
    1, 'reservado', false),

  ('Colar Ponto de Luz',
    'Corrente delicada com pingente cravejado de zircônia, para um brilho discreto no dia a dia.',
    'colares', 'Ouro 18k com zircônia', 1980.00,
    array['https://placehold.co/900x1100/D9B8AE/FFFFFF.png?text=Ponto+de+Luz', 'https://placehold.co/900x1100/EDE6DA/B28A4F.png?text=Detalhe'],
    2, 'disponivel', true),

  ('Brincos Pérola Clássica',
    'Pérolas naturais montadas em ouro 18k. Elegância clássica que nunca sai de moda.',
    'brincos', 'Pérola natural e ouro 18k', 1150.00,
    array['https://placehold.co/900x1100/F5EFE4/2A2420.png?text=Brincos+P%C3%A9rola'],
    4, 'disponivel', false),

  ('Pulseira Elos Cartier',
    'Pulseira de elos cartier em ouro amarelo maciço, peça icônica para uso diário.',
    'pulseiras', 'Ouro amarelo 18k', 4200.00,
    array['https://placehold.co/900x1100/EDE6DA/B28A4F.png?text=Elos+Cartier'],
    0, 'indisponivel', false),

  ('Anel Vintage Esmeralda',
    'Anel de época com esmeralda central e lapidação artesanal em ouro amarelo.',
    'aneis', 'Ouro amarelo 18k e esmeralda', 5600.00,
    array['https://placehold.co/900x1100/E7DED0/2A2420.png?text=Anel+Esmeralda', 'https://placehold.co/900x1100/EDE6DA/B28A4F.png?text=Detalhe'],
    1, 'disponivel', false),

  ('Colar Choker Minimalista',
    'Choker fino em prata 925, ajustável, para compor looks contemporâneos.',
    'outros', 'Prata 925', 480.00,
    array['https://placehold.co/900x1100/F5EFE4/2A2420.png?text=Choker+Minimalista'],
    3, 'disponivel', false);
