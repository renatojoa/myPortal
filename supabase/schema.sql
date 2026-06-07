-- Run in Supabase SQL Editor

create table projects (
  id                serial primary key,
  title             text not null,
  description       text,
  technologies      text[],
  image_url         text,
  apple_url         text,
  android_url       text,
  web_url           text,
  category          text,
  available         boolean default true,
  company           text,
  currently_working boolean default false,
  sort_order        int default 0,
  created_at        timestamptz default now()
);

create table skills (
  id          serial primary key,
  category    text not null,
  name        text not null,
  icon_url    text,
  sort_order  int default 0
);

create table companies (
  id           serial primary key,
  name         text not null,
  position     text,
  period_start text,
  period_end   text,
  current      boolean default false,
  logo_url     text,
  description  text,
  hidden       boolean default false,
  sort_order   int default 0,
  wiki_title   text
);

-- To add wiki_title to an existing DB:
-- ALTER TABLE companies ADD COLUMN wiki_title text;

alter table projects enable row level security;
alter table skills   enable row level security;
alter table companies enable row level security;

create policy "public read projects"  on projects  for select using (true);
create policy "public read skills"    on skills    for select using (true);
create policy "public read companies" on companies for select using (true);

create policy "auth write projects"   on projects  for all using (auth.role() = 'authenticated');
create policy "auth write skills"     on skills    for all using (auth.role() = 'authenticated');
create policy "auth write companies"  on companies for all using (auth.role() = 'authenticated');
