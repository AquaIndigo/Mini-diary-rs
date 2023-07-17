import React, { ChangeEvent, FormEvent, PureComponent, ReactNode } from "react";

import Banner from "../../elements/general/Banner";
import StartPage from "./StartPage";

export interface StateProps {
    decryptErrorMsg: string;
    decryptStatus: string;
}

export interface DispatchProps {
    decryptFile:  (password: string) => Promise<void>;
}

type Props = StateProps & DispatchProps;

interface State {
    isSubmitted: boolean;
    password: string;
}

export default class PasswordPrompt extends PureComponent<Props, State> {
    input: HTMLInputElement | undefined;

    constructor(props: Props) {
        super(props);

        this.state = {
            isSubmitted: false,
            password: "",
        };

        // Function bindings
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e: ChangeEvent<HTMLInputElement>): void {
        this.setState({
            isSubmitted: false,
            password: e.target.value,
        });
    }

    /**
     * Test decrypting the diary file with the provided password. On success, save the password and
     * the decrypted diary entries to the Redux store. Otherwise, throw an error
     */
    async onSubmit(e: FormEvent): Promise<void> {
        e.preventDefault();
        const {decryptFile} = this.props;
        const {password} = this.state;

        // Display error if password is incorrect

        // Try to decrypt the diary file - this.props.decryptStatus will be updated depending on whether
        // decryption was successful or unsuccessful
        await decryptFile(password);

        this.setState({
            isSubmitted: true,
        });
        // Select entered password if it is incorrect
        // @ts-ignore
        this.input.select();
    }

    render(): ReactNode {
        const { decryptErrorMsg, decryptStatus } = this.props;
        const { isSubmitted, password } = this.state;

        return (
            <StartPage>
                <form className="password-prompt-form" onSubmit={this.onSubmit}>
                    <input
                        type="password"
                        value={password}
                        onChange={this.onChange}
                        placeholder={"password"}
                        autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                        required
                        ref={(input: HTMLInputElement): void => {
                            this.input = input;
                        }}
                    />
                    <button type="submit" className="button button-main">
                        {"unlock"}
                    </button>
                </form>
                <div className="password-prompt-banner">
                    {isSubmitted && decryptStatus === "error" && (
                        <Banner bannerType="error" message={decryptErrorMsg} />
                    )}
                </div>
            </StartPage>
        );
    }
}
