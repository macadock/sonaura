include .env.local

gen:
	npx supabase gen types typescript $(SUPABASE_GEN_PROJECT) --schema public > types/supabase.ts

install:
	yarn install
	npx supabase start

start:
	yarn dev

stop:
	npx supabase stop
