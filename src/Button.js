import PropTypes from "prop-types"
import styles from "./App.module.css";

function Button({text}){
    return <button className={styles.button}>
        {text}</button>
}

Button.prototype = {
    text: PropTypes.string.isRequired,
}
export default Button;