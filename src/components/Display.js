function Display(props) {
    return (
        <div id="display" className="flex flex-wrap">
            {props.cards.map((card, index) => {
                return <img key={index} src={card.image} data-id={card.id} alt="tarot card" onClick={props.touchCard}></img>
            })}
        </div>
    )
}

export { Display }