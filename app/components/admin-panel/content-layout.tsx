import { Navbar } from "~/components/admin-panel/navbar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "~/components/ui/breadcrumb";
import { Link } from "@remix-run/react";

interface ContentLayoutProps {
	title: string;
	children: React.ReactNode;
	userInfo: any;
}

export function ContentLayout({ title, children, userInfo }: ContentLayoutProps) {

	return (
		<div>
			<Navbar title={title} userInfo={userInfo} />
			<div className="pt-8 pb-8 px-4 sm:px-8">
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbLink asChild>
								<Link to="/">Home</Link>
							</BreadcrumbLink>
						</BreadcrumbItem>
						<BreadcrumbSeparator />
						<BreadcrumbItem>
							<BreadcrumbPage>{title}</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
				{children}
			</div>
		</div>
	);
}
