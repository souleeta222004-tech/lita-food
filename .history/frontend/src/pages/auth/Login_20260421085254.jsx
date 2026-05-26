export default function Login({ switchToRegister }) {
  return (
    <div style={styles.container}>
      <h2>Login</h2>

      <input placeholder="Email" style={styles.input} />
      <input placeholder="Password" type="password" style={styles.input} />

      <button style={styles.button}>
        Login
      </button>

      <p onClick={switchToRegister} style={styles.link}>
        No account? Register
      </p>
    </div>
  );
}

const styles = {
  container: {
    width: 300,
    margin: "100px auto",
    padding: 20,
    boxShadow: "0 0 10px #ddd",
    borderRadius: 10,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "8px 0",
  },
  button: {
    width: "100%",
    padding: 10,
    background: "#f8b4d9",
    border: "none",
    cursor: "pointer",
  },
  link: {
    marginTop: 10,
    cursor: "pointer",
    color: "blue",
  },
};