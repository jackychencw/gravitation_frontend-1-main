import json
import pandas as pd
from datetime import datetime
from elasticsearch import Elasticsearch
import json

es = Elasticsearch()


def process_news():
    es.indices.delete(index='news', ignore=[400, 404])

    with open('news/News_Category_Dataset_v2.json') as f:
        for idx, line in enumerate(f):
            idx += 99999

            doc = json.loads(line.strip())
            doc_formatted = {
                'Domain': doc['category'],
                'area': doc['authors'],
                'Abstract': doc['headline'] + '-' + doc['short_description'],
                **doc
            }
            _ = es.index(index="news", id=idx, body=doc_formatted)
            if idx % 1000 == 0:
                print(idx)


def process_academic():
    # preprocess
    path_metadata = 'WebOfScience/Meta-data/Data.xlsx'
    df = pd.read_excel(path_metadata)

    df_labels = df.set_index(['Y1', 'Y2', 'Y'])
    l = df_labels.shape[0]
    with open('WebOfScience/Meta-data/full.json', 'w') as f:
        for idx, row in df.iterrows():
            if idx % 10000 == 0: print(f'{idx} / {l}, {idx / l}')
            f.write(row.to_json())
            f.write('\n')

    index_file = 'WebOfScience/Meta-data/full.json'
    with open(index_file) as f:
        for idx, line in enumerate(f):
            doc = json.loads(line.strip())
            _ = es.index(index="wos-metadata", id=idx, body=doc)
            if idx % 1000 == 0:
                print(idx)


if __name__ == '__main__':
    process_news()
