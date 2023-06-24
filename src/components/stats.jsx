const Stats = ({items}) => {

    if(!items.length){
        return (
            <footer className="stats">
                <em>
                    Start adding some items in your packing list 🚀
                </em>
            </footer>
        );
    }
    const countItems = items.length;
    const packedItems = items.filter((item) => item.packed).length;
    const percentage = Math.round((packedItems/countItems) * 100);
    return (
        <footer className="stats">
            <em>
                { percentage === 100 ? 'You got everything! Ready to go. ✈' : `💼 You have ${countItems} items on your list, you already packed ${packedItems} (${percentage}%).`}
            </em>
        </footer>
    );
}

export default Stats;