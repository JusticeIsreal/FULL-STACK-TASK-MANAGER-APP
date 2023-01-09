const reducer = (state, action) => {
  if (action.type === "CHECKBOX_ON") {
    return {
      ...state,
      complete: true,
    };
  }
  if (action.type === "CHECKBOX_OFF") {
    return {
      ...state,
      complete: false,
    };
  }
  if (action.type === "TASK_INPUT") {
    return {
      ...state,
      newTask: action.payload.target.value,
    };
  }

  return state;
};

export default reducer;
