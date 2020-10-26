const Form = ({ errorMessage, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <label>
      <span>Email</span>
      <input type="email" name="email" required />
    </label>

    <div className="submit">
      <button type="submit">Sign Up / Login</button>
    </div>

    {errorMessage && <p className="error">{errorMessage}</p>}
  </form>
);

export default Form;
