-- Create function for vector similarity search
CREATE OR REPLACE FUNCTION match_health_embeddings(
  query_embedding vector(1536),
  match_threshold float DEFAULT 0.7,
  match_count int DEFAULT 5
)
RETURNS TABLE (
  id uuid,
  chunk_id uuid,
  chunk_text text,
  metadata jsonb,
  similarity float
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    he.id,
    he.chunk_id,
    dc.chunk_text,
    dc.metadata,
    1 - (he.embedding <=> query_embedding) AS similarity
  FROM health_embeddings he
  JOIN document_chunks dc ON dc.id = he.chunk_id
  WHERE 1 - (he.embedding <=> query_embedding) > match_threshold
  ORDER BY he.embedding <=> query_embedding
  LIMIT match_count;
END;
$$;