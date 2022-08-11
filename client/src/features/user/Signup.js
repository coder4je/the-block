import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

function Signup() {
  const dispatch = useDispatch();
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();

  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userElector);

  const onSubmit = (data) => {
    dispatch(signupUser(data));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      dispatch(clearState());
      history.push("/");
    }
    if (isError) {
      toast.error(errorMessage);
    }
  }, [isSuccess, isError]);

  return (
    <div className="form">
      <div className="form-body">
        <div className="username">
          <label className="form_label" for="username">
            Username
          </label>
          <input
            className="form_input"
            type="text"
            id="username"
            placeholder="Username"
          />
        </div>
        <div className="email">
          <label className="form_label" for="email">
            email
          </label>
          <input
            className="form_input"
            type="text"
            id="email"
            placeholder="email"
          />
        </div>
        <div className="password">
          <label className="form_label" for="password">
            password
          </label>
          <input
            className="form_input"
            type="text"
            id="password"
            placeholder="password"
          />
        </div>
        <div className="phone_number">
          <label className="form_label" for="phone_number">
            Phone Number
          </label>
          <input
            className="form_input"
            type="text"
            id="phone_number"
            placeholder="phone number"
          />
        </div>
        <div className="picture">
          <label className="form_label" for="picture">
            Picture
          </label>
          <input
            className="form_input"
            type="file"
            id="picture"
            placeholder="picture"
          />
        </div>
      </div>
      <div className="footer">
        <button
          type="submit"
          className="submit_btn"
          onSubmit={handleSubmit(onSubmit)}
          method="POST"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default Signup;
