import "./style.less";

export default function Loading({ clear }) {
  return <div className={`loading-anim ${ clear ? 'hide-anim' : '' }`}></div>;
}
