function Display(props) {
    return (
        <div className="flex flex-wrap justify-center align-center">
            {props.cards.map((card, index) => {
                return <img key={index} src={card.image} data-id={card.id} alt="tarot card" onClick={props.touchCard}></img>
            })}
        </div>
    )
}

export { Display }