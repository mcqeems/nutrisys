# Nutrisys

## Panduan Developer

Struktur penggunaan **Server Action**:

```
app/
	(fulan_folder)/
		page.tsx
		actions.ts -- ini untuk mengkonversi actions ke form
lib/
	actions/
		(fulan_folder)/
			(fulan_name).ts -- server action original yang tersambung ke server
```

> Jangan memakai api/ kecuali login, register!
