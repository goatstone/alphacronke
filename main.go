// main.go 

package alphacronke

import (
	"bytes"
	"html/template"
	"net/http"
	"appengine"
)

var (
	templates = template.Must(template.ParseFiles(
		"index.html",
	))
)

func init() {
	http.HandleFunc("/", uploadHandler)
}

 func uploadHandler(w http.ResponseWriter, r *http.Request) {
	if r.URL.Path != "/" {
		http.NotFound(w, r)
		return
	}
	if r.Method != "POST" {
		// No upload; show the upload form.
		b := &bytes.Buffer{}
		if err := templates.ExecuteTemplate(b, "index.html", nil); err != nil {
			writeError(w, r, err)
			return
		}
		b.WriteTo(w)
		return
	}
}

// writeError renders the error in the HTTP response.
func writeError(w http.ResponseWriter, r *http.Request, err error) {
	c := appengine.NewContext(r)
	c.Errorf("Error: %v", err)
	w.WriteHeader(http.StatusInternalServerError)
	// if err := templates.ExecuteTemplate(w, "error.html", err); err != nil {
	// 	c.Errorf("templates.ExecuteTemplate: %v", err)
	// }
}
