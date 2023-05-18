--  RUN 1st
create extension vector;

-- RUN 2nd
create table doc (
  id bigserial primary key,
  essay_title text,
  essay_url text,
  essay_date text,
  essay_thanks text,
  content text,
  content_length bigint,
  content_tokens bigint,
  embedding vector (1536)
);

-- RUN 3rd after running the scripts
create or replace function doc_search (
  query_embedding vector(1536),
  similarity_threshold float,
  match_count int
)
returns table (
  id bigint,
  content text,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    doc.id,
    doc.content,
    doc.content_length,
    doc.content_tokens,
    1 - (doc.embedding <=> query_embedding) as similarity
  from doc
  where 1 - (doc.embedding <=> query_embedding) > similarity_threshold
  order by doc.embedding <=> query_embedding
  limit match_count;
end;
$$;

-- RUN 4th
create index on doc 
using ivfflat (embedding vector_cosine_ops)
with (lists = 100);