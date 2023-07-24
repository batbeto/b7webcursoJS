let modalQt = 1;
let cart = [];
let modalKey = 0;

const q = (e)=>{
  return document.querySelector(e);
}

const qAll = (e) => {
  return document.querySelectorAll(e);
}

let removeSelected = ()=>{
  q('.pizzaInfo--size.selected').classList.remove('selected');
}

let closeModal = () =>{
  q('.pizzaWindowArea').style.opacity = 0;
  setTimeout(()=>{
    q('.pizzaWindowArea').style.display = 'none';
  },500);  
}

let changeSize = () =>{
  qAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
    size.addEventListener('click', (e)=>{
      removeSelected();
      size.classList.add('selected');
      q('.pizzaInfo--actualPrice').innerHTML = `R$${pizzaJson[modalKey].prices[sizeIndex].toFixed(2)}`;    
    });
  });
}


let changeModalQt = (qt) =>{
  q('.pizzaInfo--qt').innerHTML = qt;
}

qAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
   item.addEventListener('click',closeModal);         
});

q('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
  if(modalQt > 1 ){
    modalQt--;
    changeModalQt(modalQt);
  }  
});

q('.pizzaInfo--qtmais').addEventListener('click', ()=>{
  modalQt++;
  changeModalQt(modalQt);
});

q('.pizzaInfo--addButton').addEventListener('click', ()=>{
  let size = parseInt(q('.pizzaInfo--size.selected').getAttribute('data-key'));
  let identifier = pizzaJson[modalKey].id+'@'+size;
  let key = cart.findIndex((item)=>{
    return item.identifier === identifier;
  });
  if(key > -1){
    cart[key].qt += modalQt;
  } else {
    cart.push({
      identifier,
      id: pizzaJson[modalKey].id,
      size,
      qt: modalQt
    });
  }   
  updateCart(); 
  closeModal();
});

q('.menu-closer').addEventListener('click',()=>{
  q('aside').style.left = '100vw';
})

q('.menu-openner').addEventListener('click', ()=>{
  if(cart.length > 0){
    q('aside').style.left = 0;  
  }
});

function updateCart () {
  q('.menu-openner span').innerHTML = cart.length;

  if(cart.length > 0){
    q('aside').classList.add('show');
    q('.cart').innerHTML = '';

    let subTotal = 0;
    let desconto = 0;
    let total = 0;

    for(let i in cart){
      let pizzaItem = pizzaJson.find((item)=>{
        return item.id == cart[i].id;
      });
      let cartItem = q('.models .cart--item').cloneNode(true);
      let pizzaSizeName;

      subTotal += pizzaItem.prices[cart[i].size] * cart[i].qt;
      switch (cart[i].size){
        case 0:
          pizzaSizeName = 'P';
          break;
        case 1:
          pizzaSizeName = 'M';
          break;
        case 2:
          pizzaSizeName = 'G';
          break;
      }
      q('.cart').append(cartItem);
      let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
      cartItem.querySelector('img').src = pizzaItem.img;
      cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
      cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
      cartItem.querySelector('.cart--item-qtmenos').addEventListener('click',()=>{
        if(cart[i].qt > 1){
          cart[i].qt--;
          
        } else {
          cart.splice(i, 1);
        } 
        updateCart();      
      });
      cartItem.querySelector('.cart--item-qtmais').addEventListener('click',()=>{
        cart[i].qt++;
        updateCart();
      });
    }
    desconto = subTotal * 0.1;
    total = subTotal - desconto;

    q('.subtotal span:last-child').innerHTML = `R$${subTotal.toFixed(2)}`;
    q('.desconto span:last-child').innerHTML = `R$${desconto.toFixed(2)}`;
    q('.total span:last-child').innerHTML = `R$${total.toFixed(2)}`;
  } else {
    q('aside').classList.remove('show');
    q('aside').style.left = '100vw';
  }
}


pizzaJson.map((item, index)=>{
  let pizza = q('.models .pizza-item').cloneNode(true);
  
  pizza.setAttribute('data-key',index);
  pizza.querySelector('.pizza-item--img img').src = item.img;
  pizza.querySelector('.pizza-item--name').innerHTML = item.name;
  pizza.querySelector('.pizza-item--desc').innerHTML = item.description;
  pizza.querySelector('.pizza-item--price').innerHTML = `R$${item.prices[0].toFixed(2)}`;
  
  pizza.querySelector('a').addEventListener('click', (e)=>{
    e.preventDefault();
    let key = e.target.closest('.pizza-item').getAttribute('data-key');

    modalQt = 1;
    modalKey = key;

    q('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
    q('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
    q('.pizzaBig img').src = pizzaJson[key].img;
    removeSelected();
    q('.pizzaInfo--actualPrice').innerHTML = `R$${pizzaJson[key].prices[0].toFixed(2)}`
    qAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
      if(sizeIndex == 0) {
        size.classList.add('selected');
      }
      size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
    });
    
    changeModalQt(modalQt);
    changeSize();
    q('.pizzaWindowArea').style.opacity = 0;
    q('.pizzaWindowArea').style.display = 'flex';
    setTimeout(()=>{
      q('.pizzaWindowArea').style.opacity = 1;  
    },200);
    
  });
  q('.pizza-area').append(pizza);
});


