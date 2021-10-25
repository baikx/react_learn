import ReactDOM from 'react-dom';

function ListItem(props) {
    return <li>{props.value}</li>
}


function NumberList(props) {
    const numbers = props.numbers;
    // 在map方法中的元素需要设置key
    const listItems = numbers.map(number =>
        <ListItem key={number.toString()} value={number}/>
    );
    return (
        <ul>{listItems}</ul>
    )
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
    <NumberList numbers={numbers} />,
    document.getElementById('root')
);

function Blog (props) {
    const sidebar = (
        <ul>
            {props.posts.map((post) =>
                <li key={post.id}>
                    {post.title}
                </li>
            )}
        </ul>
    );
    const content = props.posts.map((post) =>
        <div>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
        </div>
    );
    return (
        <div>
            {sidebar}
            <br />
            {content}
        </div>
    );
}

const posts = [
    {id: 1, title: 'Hello world', content: 'Welcome to learning React!'},
    {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];

ReactDOM.render(
    <Blog posts={posts} />,
    document.getElementById('root')
);


function NumberList2 (props) {
    const numbers = props.numbers;
    return(
        <ul>
            {numbers.map((number) =>
                <ListItem key={number.toString()} value={number} />
            )}
        </ul>
    );
}