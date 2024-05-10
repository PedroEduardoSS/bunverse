const server = Bun.serve({
    port: 4000,
    async fetch(req) {
      const url = new URL(req.url);
  
      // return index.html for root path
      if (url.pathname === "/")
        return new Response(Bun.file("index.html"), {
          headers: {
            "Content-Type": "text/html",
          },
        });
  
      // parse formdata at /action
      if (url.pathname === '/action') {
        const formdata = await req.formData();
        const name = formdata.get('name');
        const profilePicture = formdata.get('profilePicture');
        if (!profilePicture) throw new Error('Must upload a profile picture.');
        // write profilePicture to disk
        await Bun.write(`${name}.png`, profilePicture);
        return new Response("Success");
      }
  
      return new Response("Not Found", { status: 404 });
    },
  });