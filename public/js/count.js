async function updateVisit () {
    
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length -1
    ];
    let page_count = parseInt(document.getElementById('page-count').innerHTML, 10);
    console.log(page_count + ' ' + id);
    // if(isNaN(page_count)) {
    //     page_count = 0;
    // }
    page_count++;
    console.log(page_count + ' ' + id);
    document.getElementById('page-count').innerHTML = page_count;
        // pageCount.innerHTML = pageCount.innerHTML.parseInt + 1;
        // console.log(parseInt(pageCount.innerHTML.value));
        // count++
        // pageCount.innerHTML = count.toString();
};      


window.onload = updateVisit();
