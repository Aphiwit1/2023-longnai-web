

export const SuggestDestination = ({ text, key, getValueSuggestion }: any) => {
    const handleClick = (event:any) => {
        // Call getValueSuggestion with the clicked suggestion's text
        const placeText = event.target.innerText
        getValueSuggestion(placeText);
      };
    
   
    return (
        <>
            {text && <div key={key} className=" inline-block text-xs text-slate-500 border-2 border-slate-100 
            rounded-lg p-2 m-1 hover:cursor-pointer  hover:border-orange-500 hover:text-orange-500" onClick={handleClick} >
                {text}
            </div>}

        </>

    )
}
