include .env.local

gen:
	npx supabase gen types typescript $(SUPABASE_GEN_PROJECT) --schema public > types/supabase.ts

start:
	npx supabase start
	yarn dev

stop:
	npx supabase stop
