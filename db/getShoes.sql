select shoes.id, name, price, details, color 
from shoes
Join colors on colors.id = shoes.colorid;