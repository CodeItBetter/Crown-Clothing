import './directory.styles.scss';
import CategoryItem from '../category-item/category-item.component';

const Directory = ({directory}) =>{
    return(
        <div className="categories-container">
            {directory.map(item => <CategoryItem item={item} key={item.id} />)}
        </div>
    )
}

export default Directory;