import { Link } from "wouter";
import { Church } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12" data-testid="footer">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Church className="text-2xl text-accent" />
              <div>
                <h3 className="text-lg font-bold">Adorned Community</h3>
                <p className="text-sm text-primary-foreground/80">Church</p>
              </div>
            </div>
            <p className="text-primary-foreground/80 text-sm">
              A place where faith grows, community thrives, and hope is found.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <Link href="/" className="hover:text-accent transition-colors" data-testid="link-footer-home">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/messages" className="hover:text-accent transition-colors" data-testid="link-footer-messages">
                  Messages
                </Link>
              </li>
              <li>
                <Link href="/devotions" className="hover:text-accent transition-colors" data-testid="link-footer-devotions">
                  Devotions
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors" data-testid="link-footer-about">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Ministries</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-accent transition-colors" data-testid="link-youth-ministry">
                  Youth Ministry
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors" data-testid="link-childrens-church">
                  Children's Church
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors" data-testid="link-bible-study">
                  Bible Study
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors" data-testid="link-community-outreach">
                  Community Outreach
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="link-facebook">
                <i className="fab fa-facebook text-lg"></i>
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="link-instagram">
                <i className="fab fa-instagram text-lg"></i>
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="link-youtube">
                <i className="fab fa-youtube text-lg"></i>
              </a>
              <a href="#" className="text-primary-foreground/80 hover:text-accent transition-colors" data-testid="link-podcast">
                <i className="fas fa-podcast text-lg"></i>
              </a>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Follow us for updates and inspiration
            </p>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-primary-foreground/80 text-sm">
            &copy; 2023 Adorned Church. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
