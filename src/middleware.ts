import { withAuth } from 'next-auth/middleware'

export default withAuth(
	function middleware() {
		// console.log("req", req.nextauth.token) // dane usera
	},
	{
		pages: {
			signIn: '/login',
		},
		callbacks: {
			authorized: ({ token, req }) => {
				const { pathname } = req.nextUrl

				if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
					return true
				}
				return !!token
			},
		},
	}
)

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
