import './Footer.css';

import TaskFilter from '../TaskFilter/TaskFilter';

const Footer = ({ countTodo, onDeleteCompleted, filter, onChangeFilter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{countTodo} items left</span>
      <TaskFilter filter={filter} onChangeFilter={onChangeFilter} />
      <button className="clear-completed" onClick={onDeleteCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
