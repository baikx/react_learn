import Item from './Item';

const List = ({ listData, deleteData, submittingStatus }) => {
    return <div className="list">
        {
            listData.map(item => {
                const { note = '', date = Date.now(), time = '', id } = item;
                return (
                    <Item
                        key={id}
                        id={id}
                        note={note}
                        date={date}
                        time={time}
                        deleteData={deleteData}
                        submittingStatus={submittingStatus}
                    />
                )
            })
        }
    </div>
}

export default List;