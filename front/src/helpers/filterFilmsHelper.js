
const filterFilmsHelper = (film, filterState) => {
    let discrepancyCounter = 0;
    
    for(let props in film) {
        if(props === "title"){
            discrepancyCounter = film[props].indexOf(filterState["filterTitle"]) >= 0?discrepancyCounter:discrepancyCounter+1;
        } else if(props === "stars"){
            let starsCounter = 0;
            film[props].map(actor => {
                starsCounter =  actor.indexOf(filterState['filterStarName']) >= 0?starsCounter:starsCounter+1;
            })
            discrepancyCounter = starsCounter === film[props].length?discrepancyCounter+1:discrepancyCounter;
        }
    }

    return discrepancyCounter === 0?true:false;
}

export default filterFilmsHelper;