const d = document,
    $table = d.querySelector(".crud-table"),
    $form = d.querySelector(".crud-form"),
    $title = d.querySelector(".crud-title"),
    $template = d.getElementById("crud-template").content,
    $fragment = d.createDocumentFragment();

const getAll = async () =>{
    try{
        let res = await fetch("https://webapi.dms.ms/api/test"),
        json = await res.json();


        if (!res.ok) throw{status: res.status,statusText: res.statusText };
        console.log(json);
        json.forEach(el =>{
            // $template.querySelector(".id").textContent = el.;
            $template.querySelector(".name").textContent = el.name;
            $template.querySelector(".phone").textContent = el.phone;
            $template.querySelector(".email").textContent = el.email;
            $template.querySelector(".country").textContent = el.country;
            $template.querySelector(".region").textContent = el.region;
            $template.querySelector(".address").textContent = el.address;
            $template.querySelector(".postalZip").textContent = el.postalZip;
            $template.querySelector(".text").textContent = el.text;
            $template.querySelector(".currency").textContent = el.currency;
            $template.querySelector(".numberrange").textContent = el.numberrange;
            $template.querySelector(".alphanumeric").textContent = el.alphanumeric;

            // $template.querySelector(".edit").textContent = el.i;
            // $template.querySelector(".edit").textContent = el.currency;
            // $template.querySelector(".edit").textContent = el.numberrange;
            // $template.querySelector(".delete").textContent = el.id;

            let $clone = d.importNode($template, true);
            $fragment.appendChild($clone)
        });
    $table.querySelector("tbody").appendChild($fragment);    
    }catch (err){
        let message = err.statusText||"Ocurrió un error";
        $table.insertAdjacentHTML("afterend", '<p><b>Error${err.status}:${message}</b></p>');  
    }
}
d-addEventListener("DOMContentLoaded", getAll);

d.addEventListener("submit", async e =>{
    if(!e.target === $form){
        e.preventDefault();

        if (!e.target.id.value) {
            //Create - POST
            try{
                let options ={
                    method:"POST",
                    headers:{
                        "Content-type":"application/json;charset=utf-8"
                    },
                    body: JSON.stringify({
                        name:e.target.name.value,
                        phone:e.target.phone.value,
                        email:e.target.email.value,
                        country:e.target.country.value,
                        region:e.target.region.value,
                        address:e.target.address.value,
                        postalZip:e.target.postalZip.value,
                        text:e.target.text.value,
                        currency:e.target.currency.value,
                        numberrange:e.target.numberrange.value
                    })
                },
                res = await fetch("https://webapi.dms.ms/api/test",options),
                json = await res.json();
                if (!res.ok) throw{status: res.status,statusText: res.statusText }; 
                location.reload();
                   
            } catch (error){
                let message = err.statusText||"Ocurrió un error";
                $table.insertAdjacentHTML("afterend", '<p><b>Error${err.status}:${message}</b></p>');  
            }
        }else{
            
            //Upload - PUT
            try{
                let options ={
                    method:"POST",
                    headers:{
                        "Content-type":"application/json;charset=utf-8"
                    },
                    body: JSON.stringify({
                        name:e.target.name.value,
                        phone:e.target.phone.value,
                        email:e.target.email.value,
                        country:e.target.country.value,
                        region:e.target.region.value,
                        address:e.target.address.value,
                        postalZip:e.target.postalZip.value,
                        text:e.target.text.value,
                        currency:e.target.currency.value,
                        numberrange:e.target.numberrange.value
                    })
                },
                res = await fetch("https://webapi.dms.ms/api/test/${e.target.alphanumeric.value}",options),
                json = await res.json();
                if (!res.ok) throw{status: res.status,statusText: res.statusText };  
                location.reload();  
            } catch (error){
                let message = err.statusText||"Ocurrió un error";
                $table.insertAdjacentHTML("afterend", '<p><b>Error${err.status}:${message}</b></p>');  
            }
        }
    }
});
d.addEventListener("click", async e=>{
    if (e.target.matches(".edit")){
        $title.textContent = "Editar Santo";
        $form.nombre.value = e.target.dataset.name;
        $form.phone.value = e.target.dataset.phone;
        $form.email.value = e.target.dataset.email;
        $form.country.value = e.target.dataset.country;
        $form.region.value = e.target.dataset.region;
        $form.address.value = e.target.dataset.address;
        $form.postalZip.value = e.target.dataset.postalZip;
        $form.text.value = e.target.dataset.text;
        $form.currency.value = e.target.dataset.currency;
        $form.numberrange.value = e.target.dataset.numberrange;
    }
    if (e.target.matches(".delete")){
        let isDelete = confirm('¿Estás Seguro de eliminar el id ${e.target.dataset.alphanumeric}?');

        if(idDelete){
            //Delete - DELETE
            try{
                let options ={
                    method:"DELETE",
                    headers:{
                        "Content-type":"application/json;charset=utf-8"
                    }
                },
                res = await fetch("https://webapi.dms.ms/api/test/${e.target.alphanumeric}",options),
                json = await res.json();
                if (!res.ok) throw{status: res.status,statusText: res.statusText };  
                location.reload();  
            } catch (error){
                let message = err.statusText||"Ocurrió un error";
                alert('Error${err.status}:${message}');  
            }
        }
    }
})