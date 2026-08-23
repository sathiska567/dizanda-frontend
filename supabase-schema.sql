-- Profiles table stores extra user data for authenticated users
create table profiles (
  id uuid primary key,
  full_name text,
  avatar_url text,
  created_at timestamptz default now()
);

-- Products table for store items
create table products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) not null,
  image_url text,
  stock int default 0,
  category text,
  created_at timestamptz default now()
);

-- Cart items table for temporary user carts
create table carts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  product_id uuid references products(id),
  quantity int not null default 1,
  added_at timestamptz default now()
);

-- Orders table for checkout history
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  total numeric(10,2) not null,
  status text not null default 'pending',
  shipping_address jsonb,
  created_at timestamptz default now()
);

-- Order items table for line items inside orders
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  product_id uuid references products(id),
  quantity int not null,
  price numeric(10,2) not null
);

-- Product reviews table
create table reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  product_id uuid references products(id),
  rating int check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz default now()
);
