from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

ARQUIVO = "tabela_final.xlsx"

df = pd.read_excel(ARQUIVO)

df.columns = df.columns.str.strip()

df["KM Inicial"] = pd.to_numeric(
    df["KM Inicial"],
    errors="coerce"
)

df["KM Final"] = pd.to_numeric(
    df["KM Final"],
    errors="coerce"
)

df["Custo Fixo"] = pd.to_numeric(
    df["Custo Fixo"],
    errors="coerce"
)

df.fillna(0, inplace=True)


@app.route("/")
def home():

    return jsonify({
        "status": "online",
        "registros": len(df)
    })


@app.route("/dashboard")
def dashboard():

    total_regioes = df["Região"].nunique()

    total_zonas = df["Zona"].nunique()

    total_veiculos = df["Veículo"].nunique()

    custo_medio = round(
        df["Custo Fixo"].mean(),
        2
    )

    custo_regiao = (
        df.groupby("Região")["Custo Fixo"]
        .sum()
        .reset_index()
        .sort_values(
            by="Custo Fixo",
            ascending=False
        )
    )

    custo_veiculo = (
        df.groupby("Veículo")["Custo Fixo"]
        .sum()
        .reset_index()
        .sort_values(
            by="Custo Fixo",
            ascending=False
        )
    )

    return jsonify({

        "kpis": {

            "total_regioes":
                int(total_regioes),

            "total_zonas":
                int(total_zonas),

            "total_veiculos":
                int(total_veiculos),

            "custo_medio":
                float(custo_medio)
        },

        "custo_regiao":
            custo_regiao.to_dict(
                orient="records"
            ),

        "custo_veiculo":
            custo_veiculo.to_dict(
                orient="records"
            )
    })


@app.route("/custos")
def custos():

    evolucao = (
        df[
            df["KM Final"] < 1000
        ][
            [
                "KM Final",
                "Custo Fixo",
                "Veículo"
            ]
        ]
    )

    return jsonify({

        "maior_tarifa":
            float(
                df["Custo Fixo"].max()
            ),

        "menor_tarifa":
            float(
                df["Custo Fixo"].min()
            ),

        "tarifa_media":
            float(
                round(
                    df["Custo Fixo"].mean(),
                    2
                )
            ),

        "amplitude":
            float(
                df["Custo Fixo"].max()
                -
                df["Custo Fixo"].min()
            ),

        "evolucao":
            evolucao.to_dict(
                orient="records"
            )
    })


@app.route("/veiculos")
def veiculos():

    dados = (
        df.groupby("Veículo")["Custo Fixo"]
        .sum()
        .reset_index()
        .sort_values(
            by="Custo Fixo",
            ascending=False
        )
    )

    return jsonify({

        "total_veiculos":
            int(
                df["Veículo"].nunique()
            ),

        "mais_caro":
            str(
                dados.iloc[0]["Veículo"]
            ),

        "mais_barato":
            str(
                dados.iloc[-1]["Veículo"]
            ),

        "dados":
            dados.to_dict(
                orient="records"
            )
    })


@app.route("/regioes")
def regioes():

    dados = (
        df.groupby("Região")["Custo Fixo"]
        .sum()
        .reset_index()
        .sort_values(
            by="Custo Fixo",
            ascending=False
        )
    )

    return jsonify({

        "dados":
            dados.to_dict(
                orient="records"
            )
    })


@app.route("/operacoes")
def operacoes():

    dados = (
        df.groupby("Zona")
        .agg({
            "Custo Fixo": "sum"
        })
        .reset_index()
        .sort_values(
            by="Custo Fixo",
            ascending=False
        )
    )

    return jsonify({

        "total_operacoes":
            int(
                len(df)
            ),

        "dados":
            dados.to_dict(
                orient="records"
            )
    })


@app.route("/simulador")
def simulador():

    scatter = (
        df[
            df["KM Final"] < 1000
        ][
            [
                "KM Final",
                "Custo Fixo",
                "Veículo",
                "Região"
            ]
        ]
    )

    return jsonify({

        "km_max":
            float(
                df["KM Final"].max()
            ),

        "km_min":
            float(
                df["KM Inicial"].min()
            ),

        "km_medio":
            float(
                round(
                    df["KM Final"].mean(),
                    2
                )
            ),

        "dados":
            scatter.to_dict(
                orient="records"
            )
    })


if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )