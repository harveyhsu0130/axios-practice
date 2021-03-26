

function init(){
 axios.get(`https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json`)
   .then(function (response) {
   

    travelData=response.data.data;
    showTravelInfo(travelData);//首次渲染
    renderC3();
    });
}

init();

  let travelData=[];
  
  let travelInfo='';
  // let travelNum=0;
  const list = document.querySelector('ul');
  const searchLocation=document.querySelector('.searchArea select');
  const showSearchNum=document.querySelector('.searchArea p');
  const addBtn=document.querySelector('.btn');
  const travelName=document.querySelector('.travelName');
  const travelImg=document.querySelector('.travelImg');
  const travelLocation=document.querySelector('.travelLocation');
  const travelPrice=document.querySelector('.travelPrice');
  const travelLevel=document.querySelector('.travelLevel');
  const travelGroup=document.querySelector('.travelGroup');
  const travelText=document.querySelector('.travelText');

  


  //新增套票
  addBtn.addEventListener('click',function(){
    if(searchLocation.value==''||travelName.value==''||travelImg.value==''||travelLocation.value==''
    ||travelPrice.value==''||travelLevel.value==''||travelGroup.value==''||travelText.value==''){
        alert('請確實填寫所有欄位');
        
    }
    else if(travelLevel.value>10||travelLevel.value<1){
        alert('套票星級必須在1~10之間');
    }else{
      let obj={};
      obj.id=travelData.length;
      obj.name=travelName.value;
      obj.imgUrl=travelImg.value;
      obj.area=travelLocation.value;
      obj.description=travelText.value;
      obj.group=Number(travelGroup.value);
      obj.price=Number(travelPrice.value);
      obj.rate=Number(travelLevel.value);
      travelData.push(obj);
      showTravelInfo(travelData);
      renderC3();
      showSearchNum.textContent=``;
      searchLocation.value="地區搜尋";
      travelName.value='';
      travelImg.value='';
      travelLocation.value='選擇景點地區';
      travelText.value='';
      travelGroup.value='';
      travelPrice.value='';
      travelLevel.value='';
    }
  })


  //顯示套票
  function showTravelInfo(travelData){
      travelInfo='';
      travelData.forEach(function(item,index){
    travelInfo+=
    `
    <li>
    <span class="location">${item.area}</span>
    <span class="starlevel">${item.rate}</span>
    <img src="${item.imgUrl}"alt="">
    <div class="travelDescription">
        <h2>${item.name}</h2>
        <p>${item.description}</p>
        <div class="travelCost">
            <span><i class="fas fa-exclamation-circle"></i>剩下最後 ${item.group} 組</span>
            <p>TWD<span>${item.price}</span></p>
        </div>
    </div>
</li>
    `
  })
  list.innerHTML=travelInfo;
}


//搜尋套票
searchLocation.addEventListener('change',function(e){

  let areaFilter=[];
  travelData.forEach(function(item){
    if(e.target.value==item.area){
      areaFilter.push(item);
      showTravelInfo(areaFilter);
      showSearchNum.textContent=`本次搜尋共 ${areaFilter.length} 筆資料`;
    }else if(e.target.value=="全部地區"){
      showTravelInfo(travelData);
      showSearchNum.textContent=`本次搜尋共 ${travelData.length} 筆資料`;
    }
  })
  
})


function renderC3(){
  let total={};
  travelData.forEach(function(item){
     if(total[item.area]==undefined){
       total[item.area]=1
     }else{
       total[item.area]+=1
     }
   })
   
   
   let newData=Object.keys(total);
   let c3Array=[]
   newData.forEach(function(item){
     let newArray=[];
     newArray.push(item);
     newArray.push(total[item]);
     c3Array.push(newArray);
      
   })
   

   const chart = c3.generate({
    bindto: '.chart',
    data: {
      columns:c3Array,
      type:'donut',
    },

    donut:{
      title:"套票地區比重",
      width: 15,
      
    },
    color: {
      pattern: ['#E68618', '#26C0C7','#5151D3' ]
    },
   
  
});

}




