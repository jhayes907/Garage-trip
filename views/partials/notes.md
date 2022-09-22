<form action="/auth/login" method="POST">
    <label for="auth-email">Email</label>
    <input id="auth-email" type="email" name="email" required>

    <label for="auth-password">Password</label>
    <input id="auth-password" type="password" name="password" required>

    <input type="submit" value="Log In">

</form>

<form action="/auth/signup" method="POST">
    <label for="new-email">Email</label>
    <input id="new-email" type="email" name="email" required>
  
    <label for="new-name">Name</label>
    <input id="new-name" type="text" name="name" required>
  
    <label for="new-password">Password</label>
    <input id="new-password" type="password" name="password" required>
  
    <input type="submit" value="Sign up">
</form>
