

const handleAccordionClick=(e)=>{
    accordionBody=e.target.nextElementSibling;
    accordionBody.classList.toggle('expanded')
    //if(accordionBody.classList.contains('expanded')){
    //    accordionBody.classList.remove('expanded');
    //}else{
    //    accordionBody.classList.add('expanded')


    //}
    
}