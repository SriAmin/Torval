export default onPinch = (pinchState, scaleFactor, source, scale, setNativeProps) => {
    var newScale = scale * scaleFactor
    if (pinchState == 3) {
      return newScale;
    }
    setNativeProps({scale:[newScale, newScale, newScale]});
    return 0;
}