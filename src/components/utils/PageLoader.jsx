import classes from "./PageLoader.module.css";

export default function PageLoader(){
    return (
    <div className={classes.container}>
      <div className={classes.loading}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
    )
}