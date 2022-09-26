<!-- <form action="/auth/login" method="POST">
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

<h3>Welcome to your PROFILE</h3>

<p>Id: <%= id %></p>
<p>Name: <%= name %></p>
<p>Email: <%= email %></p>

<div></div>
<div class="row">
    <table class="table table-bordered table-striped">
        <thead>
            <th>Name</th>
        </thead>
        <tbody>
            <% if(Array.isArray(listings) && listings.length > 0) { %>
                <% listings.forEach((listing) => { %>
                    <tr>
                        <td><a href="//<%= listing.id %>">
                            <%= listing.name %>
                        </a></td>
                    </tr>
                <% }) %>
            <% } %>
        </tbody>
    </table>
  </div> -->

app.get('/profile/edit', isLoggedIn, (req, res) => {
   res.render('/profile') 
})

app.put('/profile/:id', isLoggedIn, async(req, res) => {
    try {
        const userUpdated = await
        db.user.update({
            email: req.body.email,
            name: req.body.name
        }, {
            where: {
                id: req.params.id
        }
    });
    res.redirect('/profile')
})
