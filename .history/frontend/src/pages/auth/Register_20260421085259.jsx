export default function Register({ switchToLogin }) {
  return (
    <div style={styles.container}>
      <h2>Register</h2>

      <input placeholder="Name" style={styles.input} />
      <input placeholder="Email" style={styles.input} />
      <input placeholder="Password" type="password" style={styles.input} />

      <button style={styles.button}>
        Register
      </button>

      <p onClick={switchToLogin} style={styles.link}>
        Already have account? Login
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
    background: "#a7f3d0",
    border: "none",
    cursor: "pointer",
  },
  link: {
    marginTop: 10,
    cursor: "pointer",
    color: "blue",
  },
};