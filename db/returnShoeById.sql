
select shoes.id, name, price, details, color 
from shoes
Join colors on colors.id = shoes.colorid
where shoes.id=$1

-- using $1= shoe.id etc.
-- Here it is only expecting one item which is the shoe id.