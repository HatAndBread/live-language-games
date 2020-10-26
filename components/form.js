const Form = ({ login, errorMessage, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <label>
      <span>Email</span>
      <input type="email" name="email" required />
    </label>
    {!login && (
      <label>
        <span>Username</span>
        <input type="text" name="username" required />
      </label>
    )}

    <div className="submit">
      <button type="submit">{login ? 'Login' : ' Sign up'}</button>
    </div>

    {errorMessage && <p className="error">{errorMessage}</p>}
  </form>
);

export default Form;
